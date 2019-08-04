import JsonVue, {Rule} from "./core";
import Vue, {ComponentOptions, VNode} from "vue";
import {Render} from "./render";

export default function component(jv: JsonVue): ComponentOptions<Vue> {
    let jsonRender: Render;
    return <ComponentOptions<Vue>>{
        mixins: [jv.config],
        data() {
            return <{ jv_$rule: Rule }>{
                jv_$rule: jv.config.rule
            };
        },
        beforeCreate(): void {
            jsonRender = new Render(jv, this);
        },
        render(): VNode | VNode[] {
            return jsonRender.render();
        }
    };
}
