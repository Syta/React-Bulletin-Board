var Note = React.createClass({
  getInitialState: function () {
    return {editing: false}
  },
  componentWillMount: function () {
    this.style = {
      right: this.random(0, window.innerWidth - 150) + 'px',
      top: this.random(0, window.innerHeight - 150) + 'px',
      transform: 'rotate(' + this.random(-25, 50) + 'deg)'
    };
  },
  componentDidMount: function () {
    $(ReactDOM.findDOMNode(this)).draggable();
  },
  random: function (min, max) {
    return (min + Math.ceil(Math.random() * max));
  },
  edit: function () {
    this.setState({editing: true});
  },
  save: function () {
    this.props.onChange(ReactDOM.findDOMNode(this.refs.newText).value, this.props.index);
    this.setState({editing: false});
  },
  remove: function () {
    this.props.onRemove(this.props.index);
  },
  renderDisplay: function () {
    return (
      <div className="note" style={this.style}>
        <p>{this.props.children}</p>
        <span>
          <button onClick={this.edit} className="btn btn-primary glyphicon glyphicon-pencil" />
          <button onClick={this.remove} className="btn btn-danger glyphicon glyphicon-trash" />
        </span>
      </div>
    );
  },
  renderForm: function () {
    return (
      <div className="note" style={this.style}>
        <textarea ref="newText" defaultValue={this.props.children}
        className="form-control"></textarea>
        <button onClick={this.save} className="btn btn-success btn-sm glyphicon glyphicon-floppy-disk" />
      </div>
    )
  },
  render: function () {
    if (this.state.editing) {
      return this.renderForm();
    } else {
      return this.renderDisplay();
    }
  }
});

var Board = React.createClass({
  propTypes: {
    count: function (props, propName) {
      if (typeof props[propName !== "number"]) {
        return new Error('must be a proper number');
      }
      if (props[propName] > 100) {
        return new Error('Creating ' + props[propName] +' notes is ridiculous');
      }
    }
  },
  getInitialState: function () {
    return {
      notes: []
    };
  },
  nextID: function () {
    this.uniqueID = this.uniqueID || 0;
    return this.uniqueID++;
  },
  componentWillMount: function () {
    /**var self = this;
    if (this.props.count) {
      $.getJSON("http://baconipsum.com/api/?type=all-meat&sentences=" +
          this.props.count + "&start-with-lorem=1&callback=?", function (results) {
            results[0].split('. ').forEach(function (sentence) {
              self.add(sentence.substring(0,40));
            });
          });
    }**/
  },
  add: function (text) {
    var arr = this.state.notes;
    arr.push({
      id: this.nextID(),
      note: text
    });
    this.setState({notes:arr});
  },
  update: function (newText, i) {
    var arr = this.state.notes;
    arr[i].note = newText;
    this.setState({notes:arr});
  },
  remove: function (i) {
    var arr = this.state.notes;
    arr.splice(i, 1);
    this.setState({notes:arr});
  },
  eachNote: function (note, i) {
    return (
      <Note key={note.id} index={i} onChange={this.update} onRemove={this.remove}>{note.note}</Note>
    );
  },
  render: function () {
    return (
      <div className="board">
        {this.state.notes.map(this.eachNote)}
        <button onClick={this.add.bind(null, "New Note")} className="btn btn-sm btn-success glyphicon glyphicon-plus" />
      </div>
    );
  }
});

ReactDOM.render(<Board count={50} />,
    document.getElementById('react-container'));
