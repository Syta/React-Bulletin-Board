var HelloWorld = React.createClass({displayName: "HelloWorld",
  render: function () {
    return (
      React.createElement("div", null, 
      React.createElement("h1", null, "Hello"), 
      React.createElement("p", null, "sdf")
      )
    );
  }
});
ReactDOM.render(React.createElement(HelloWorld, null), document.body);
