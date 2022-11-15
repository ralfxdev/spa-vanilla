export default class App {
    constructor(selector) {
        this.appElement = document.querySelector(selector)
        this.components = {};
    }
    addComponent(component){
        this.components[component.name] = component;
        component.model = this.proxy(component.model);
    }
    showComponent(name){
        this.currentComponent = this.components[name];
        this.updateView()
        if (this.currentComponent){
            this.currentComponent.controller(this.currentComponent.model);
        }
    }
    updateView(){
        this.appElement.innerHTML = this.currentComponent.view(this.currentComponent.model)
    }
    proxy(model){
        return new Proxy(model, {
            set: (target,property,value) =>{
                target[property] = value;
                this.updateView();
                return true
            }
        })
    }
}