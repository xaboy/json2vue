import Vue, {ComponentOptions} from "vue";
import component from "./component";
import {isString} from "./utils";

export interface Rule {
    type: string;
    template?: string;
    vm?: Vue;
    children?: Array<Rule | string>;
    props: Record<string, any>;

    [key: string]: any;

    _jv?: symbol;
}

export interface Config {
    rule: Rule[] | Rule | ((this: Vue) => Rule | Rule[]);

    mounted?(): void;
}

export default class JsonVue {
    readonly config: Config;
    readonly component: ComponentOptions<Vue>;

    constructor(config: Config) {
        this.config = config;
        this.component = component(this);
    }

    mount(parent?: Element | string | null): Vue {
        const $vm = new (Vue.extend(this.component));
        $vm.$mount();
        if (isString(parent)) parent = document.querySelector(<string>parent);
        if (parent === undefined)
            parent = document.body;

        (<Element>parent).append($vm.$el);

        return $vm;
    }
}

//@ts-ignore
JsonVue.version = process.env.VERSION;