var BookmarkCategoryRow = React.createClass({
    render: function() {
        return (<tr><th colSpan='2'>{this.props.category}</th></tr>);
    }
});

var BookmarkRow = React.createClass({
    render: function() {
        return (
            <tr>
                <td>{this.props.bookmark.name}</td>
                <td><a href={this.props.bookmark.link} target='about:blank'>View</a></td>
            </tr>
        );
    }
});

var BookmarkTable = React.createClass({
    render: function() {
        var rows = [];
        var lastCategory = null;
        this.props.bookmarks.forEach(function(bookmark) {
            if (bookmark.name.indexOf(this.props.filterText) === -1) {
                return;
            }
            if (bookmark.category !== lastCategory) {
                rows.push(<BookmarkCategoryRow category={bookmark.category} key={bookmark.category} />);
            }
            rows.push(<BookmarkRow bookmark={bookmark} key={bookmark.name} />);
            lastCategory = bookmark.category;
        }.bind(this));

        return (
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Link</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
});

var SearchBar = React.createClass({
    handleChange : function() {
        this.props.onUserInput(
            this.refs.filterTextInput.getDOMNode().value
        );
    },
    render: function() {
        return (
            <form>
                <input
                    type='text'
                    placeholder='Search...'
                    value={this.props.filterText}
                    ref="filterTextInput"
                    onChange={this.handleChange}
                    />
            </form>
        );
    }
});

var FilterableBookmarkTable = React.createClass({
    getInitialState: function() {
        return {
            filterText: 'React'
        };
    },

    handleUserInput: function(filterText) {
        this.setState({
            filterText: filterText
        })
    },

    render: function() {
        return (
            <div>
                <SearchBar
                    filterText={this.state.filterText}
                    onUserInput={this.handleUserInput}
                />
                <BookmarkTable
                    bookmarks={this.props.bookmarks}
                    filterText={this.state.filterText}
                />
            </div>
        );
    }
});

var BOOKMARKS = [
    {category: 'Javascript', link: 'http://facebook.github.io/react/', name: 'React JS Tutorial'},
    {category: 'Javascript', link: 'https://github.com/badsyntax/react-seed', name: 'React JS boilerplate'},
    {category: 'Javascript', link: 'http://facebook.github.io/react/', name: 'React JS Virtual Dom Algorism'},
    {category: 'Python', link: 'https://pythonpedia.com/', name: 'python pedia'},
    {category: 'Python', link: 'http://byteofpython-korean.sourceforge.net/byte_of_python.html', name: 'start python'},
    {category: 'Python', link: 'https://opentutorials.org/module/1569', name: 'opentutorial for python'}
];


React.render(<FilterableBookmarkTable bookmarks={BOOKMARKS} />, document.getElementById('bookmarks'));