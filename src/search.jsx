import { h, Component } from 'preact';
import Popover from './popover.js'
import './search.css';

const SCOPE = 'adobecom';
const API_KEY = 'adobedotcom2';

class SearchBox extends Component {
  state = { query: '', suggestions: [], showPopover: false };

  fetchSuggestions = async (query) => {
    const response = await fetch(`https://adobesearch.adobe.io/autocomplete/completions?q[text]=${query}&q[locale]=en_us&scope=${SCOPE}`, {
      method: 'GET',
      headers: { 'x-api-key': API_KEY },
    });
    if (!response.ok) {
      console.error('Failed to fetch suggestions');
      return;
    }
    const data = await response.json();
    this.setState({ suggestions: data.suggested_completions || [], showPopover: true });
  };

  handleInput = async (e) => {
    const query = e.target.value;
    this.setState({ query });
    if (query.length > 1) { // Only fetch suggestions if the query length is greater than 1
      await this.fetchSuggestions(query);
    } else {
      this.setState({ suggestions: [], showPopover: false  });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Searching for: ${this.state.query}`);
    // Implement search logic here
  };

  renderSuggestions = () => {
    const { suggestions } = this.state;
    return suggestions.map((suggestion, index) => (
          <div key={index} style={{ padding: '1px', cursor: 'pointer'}} onClick={() => this.setState({ query: suggestion.name, suggestions: [], showPopover: false })}>{suggestion.name}</div>
        ));
  };

  render() {
    const { query, showPopover } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className="search-box">
        <input
          type="search"
          value={this.state.query}
          onInput={this.handleInput}
          placeholder="Search Adobe Support"
          style={{ width: '300px', padding: '10px', marginRight: '10px' }}
        />
        {showPopover && (
          <Popover content={this.renderSuggestions()} placement="bottom" />
        )}
        <button type="submit" className="button-sumbit">Search</button>
      </form>
    );
  }
}

export default SearchBox;
