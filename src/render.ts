import JsonVue, {Rule} from "./core";
import Vue, {VNodeChildren, VNode} from "vue";
import {isString, isType} from "./utils";

export class Render {
    readonly jv: JsonVue;
    readonly vm: Vue;

    constructor(jv: JsonVue, vm: Vue) {
        this.jv = jv;
        this.vm = vm;
    }

    render(): VNode {

        //@ts-ignore
        let rule = this.vm.jv_$rule;

        if (isType(rule, 'Function'))
            rule = (<Function>rule).call(this.vm);

        return Array.isArray(rule) ? this.vm.$createElement('div', {}, rule.map(rule => {
            return this.renderRule(rule);
        })) : <VNode>this.renderRule(<Rule>rule);
    }

    renderRule(rule: Rule): VNode | VNode[] {
        if (rule.type === "template" && rule.template) {
            return this.renderTemplate(rule);
        } else {
            const children = this.renderChildren(rule.children || []);
            return this.vm.$createElement(rule.type, getProps(rule), children);
        }
    }

    renderChildren(rule: Array<Rule | string>): VNodeChildren {
        return <VNodeChildren>rule.map(child => isString(child) ? child : this.renderRule(<Rule>child));
    }

    renderTemplate(rule: Rule): VNode | VNode[] {
        if (Vue.compile === undefined) {
            console.error("使用的 Vue 版本不支持 compile");
            return [];
        }

        if (!rule.vm) rule.vm = new Vue();

        setTemplateProps(rule);

        //@ts-ignore
        const vn = <VNode>Vue.compile(<string>rule.template).render.call(rule.vm);

        return vn;
    }
}

const propsName = ['class', 'style', 'attrs', 'props', 'domProps', 'on', 'nativeOn', 'directives', 'scopedSlots', 'slot', 'ref', 'key'];

function getProps(rule: Rule) {
    const props: any = {};
    propsName.forEach(name => {
        if (rule[name] !== undefined)
            props[name] = rule[name];
    });
    return props;
}

function setTemplateProps(rule: Rule) {
    if (!rule.vm!.$props) return;

    const keys = Object.keys(rule.vm!.$props);
    keys.forEach(key => {
        if (rule.props[key] !== undefined) rule.vm!.$props[key] = rule.props[key];
    });
}
