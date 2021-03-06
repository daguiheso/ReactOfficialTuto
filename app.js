var React = require('react');
var ReactDOM = require ('react-dom');
var marked = require('marked');
var datas = [
  {id: 1, author: "Daniel Hernandez", text: "This is one comment"},
  {id: 2, author: "Jordan Walke", text: "This is *another* comment"}
];

var CommentBox = React.createClass({
	getInitialState() {
		return {data : datas};
	},
	render : function () {
		return (
			<div className='commentBox'>
				<h1>Comments</h1>
				<CommentList data={this.state.data}/>
				<CommentForm/>
			</div>
		);
	}
});

var CommentList = React.createClass({
	render : function () {
		// mapeo de todos los comentarios 
		var commentNodes = this.props.data.map(
			function (comment) {
				return (
					<Comment author={comment.author} key={comment.id}>
						{comment.text}
					</Comment>
				);
			}
		);
		return (
			<div className='commentList'>
				{commentNodes}
			</div>
		);
	}
});

var CommentForm = React.createClass({
	render : function () {
		return (
			<div className="commentForm">
				Hello, world! I am a CommentForm.
			</div>
		);
	}
});

var Comment = React.createClass({
	rawMarkup : function () {
		var rawMarkup = marked(this.props.children.toString(), {sanitaze : true});
		return { __html : rawMarkup };
	},
	render : function() {
		return (
			<div className="comment">
				<h2 className="commentAuthor">
					{this.props.author}
				</h2>
				<span dangerouslySetInnerHTML={this.rawMarkup()}/>
			</div>
		);
	}
});

ReactDOM.render(
	<CommentBox/>,
	document.getElementById('content')
); 