var MyReact = MyReact || {};
var MyReactDOM = MyReactDOM || {};

(function () {
  MyReact.Component = class Component {
    setState(partialState) {
      Object.assign(this.state, partialState);

      MyReactDOM.render(this, MyReactDOM.__Container__,);
    };
    componentDidMount() {}
  
  }
})();

(function () {
  function createElement(node) {
    
    var element = document.createElement(node.type);
    if (node.className) {
      element.className = node.className;
    }
    Object.keys(node).forEach((i) => {
      if (i.startsWith('on')) {
        var listener = i.slice(2);
        listener = listener.toLowerCase();
        element.addEventListener(listener, node[i]);
      }
    });


    if (node.text) {
      element.textContent = node.text;
    }

    if (node.children) {
      node.children.forEach(child => {
        var childElement = createElement(child);
        element.append(childElement);
      });
    }

    return element;
  }

  MyReactDOM.render = function render(Component, Container) {
    MyReactDOM.__Container__ = Container;
    
    var vitualDOM = Component.render();
    
    var realDOM = createElement(vitualDOM);
    Container.innerHTML = "";
    Container.append(realDOM);

    Component.componentDidMount();
  }
})();

