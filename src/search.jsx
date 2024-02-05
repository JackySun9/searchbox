import { h, Component } from 'preact';
import Popover from './popover.js'
import './search.css';
import Card from './card.js';

const SCOPE = 'adobe_com';
const API_KEY = 'adobedotcom2';

class SearchBox extends Component {
  state = { query: '', results: [], suggestions: [], showResult:false, showPopover: false };

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

  fetchSearchResults = async (query) => {
    const response = await fetch(`https://adobesearch.adobe.io/universal-search-enterprise/search`, {
      method: 'POST',
      headers: { 'x-api-key': API_KEY, 'Content-Type': 'application/json'},
      body: JSON.stringify({ q: query, locale: 'en_us', scope: [SCOPE],}),
    });
    if (!response.ok) {
      console.error('Failed to fetch search results');
      return;
    }
    const data = await response.json();
    console.log(data);
    this.setState({ results: data.result_sets[0].items, showResult: true});
  }

  handleInput = async (e) => {
    const query = e.target.value;
    this.setState({ query });
    if (query.length > 1) { // Only fetch suggestions if the query length is greater than 1
      await this.fetchSuggestions(query);
    } else {
      this.setState({ suggestions: [], showPopover: false, showResult: false});
    }
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    console.log(`Searching for: ${this.state.query}`);
    if (this.state.query.length > 0) {
      await this.fetchSearchResults(this.state.query);
    } else {
      this.setState({ results: [], showResult: false});
    }
  };

  renderSuggestions = () => {
    const { suggestions } = this.state;
    return suggestions.map((suggestion, index) => (
          <div key={index} style={{ padding: '1px', cursor: 'pointer'}} onClick={() => this.setState({ query: suggestion.name, suggestions: [], showPopover: false })}>{suggestion.name}</div>
        ));
  };

  renderResults = () => {
    const { results } = this.state;
    return results.map((result, index) => (
          <Card
            key={index} 
            title={result.asset_name}
            content={result.excerpt} 
            imageUrl="https://placekitten.com/300/200"
            url={result._links.source.href}
          />
        ));
  };

  render() {
    const { query, showPopover, showResult } = this.state;

    return (
      <div>
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
        {showResult && (
          <div className="search-results">
              {this.renderResults()}
          </div>
        )}
      </div>
    );
  }
}

export default SearchBox;
