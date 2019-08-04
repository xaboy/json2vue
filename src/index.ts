import jsonVue from "./core";

if (typeof window !== 'undefined')
//@ts-ignore
    window['jsonVue'] = jsonVue;

export default jsonVue;