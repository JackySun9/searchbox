import { h, Component } from 'preact';

const SCOPE = 'adobecom';
const API_KEY = 'adobedotcom2';

class SearchBox extends Component {
  state = { query: '', suggestions: [] };

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
    this.setState({ suggestions: data.suggested_completions || [] });
  };

  handleInput = (e) => {
    const query = e.target.value;
    this.setState({ query });
    if (query.length > 1) { // Only fetch suggestions if the query length is greater than 1
      this.fetchSuggestions(query);
    } else {
      this.setState({ suggestions: [] });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Searching for: ${this.state.query}`);
    // Implement search logic here
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '20px' }}>
        <input
          type="search"
          value={this.state.query}
          onInput={this.handleInput}
          placeholder="Search Adobe Support"
          style={{ width: '300px', padding: '10px', marginRight: '10px' }}
        />
        <button type="submit" style={{ padding: '10px 20px' }}>Search</button>
        {this.state.suggestions.length > 0 && (
          <ul style={{ position: 'absolute', top: '100%', left: 0, right: 0, backgroundColor: 'white', listStyleType: 'none', padding: 0 }}>
            {this.state.suggestions.map((suggestion, index) => (
              <li key={index} style={{ padding: '1px', cursor: 'pointer', textAlign: 'left' }} onClick={() => this.setState({ query: suggestion.name, suggestions: [] })}>
                {suggestion.name}
              </li>
            ))}
          </ul>
        )}
      </form>
    );
  }
}

export default SearchBox;
