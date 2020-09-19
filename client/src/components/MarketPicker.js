import React from 'react'
import { Grid, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

class MarketPicker extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: [],
      markets: [],
      selectedCategory: '',
      selectedMarket: '',
      selectMarketDisabled: true
    }

    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleMarketChange = this.handleMarketChange.bind(this);
  }

  handleCategoryChange(e) {
    const categoryId = e.target.value

    this.setState({
      selectedCategory: categoryId,
      selectedMarket: ''
    })

    this.fetchMarkets(categoryId)
      .then(data => {
        this.setState({
          markets: data,
          selectMarketDisabled: false
        })
      })

    this.props.onCategoryChange()
  }

  handleMarketChange(e) {
    const marketId = e.target.value

    this.setState({
      selectedMarket: marketId
    })

    this.props.onMarketChange(marketId)
  }

  componentDidMount() {
    this.fetchCategories()
      .then(data => {
        this.setState({
          categories: data
        })
      })
  }

  fetchCategories() {
    return fetch('api/events')
      .then(res => res.json())
      .catch(console.error)
  }

  fetchMarkets(categoryId) {
    return fetch(`api/events/${categoryId}/markets`)
      .then(res => res.json())
      .catch(console.error)
  }

  render() {
    return (
      <Grid container spacing={2} direction="row" justify="flex-start" alignItems="flex-start">
        <Grid item xs={12} md={6}>
        <FormControl style={{ width: '100%' }}>
          <InputLabel id="select-category-label">Choose a category</InputLabel>
          <Select labelId="select-category-label" id="select-category" value={this.state.selectedCategory} onChange={this.handleCategoryChange}>
            {this.state.categories.map((category, index) => (
              <MenuItem key={index} value={category.id}>{category.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
        <FormControl style={{ width: '100%' }} disabled={this.state.selectMarketDisabled}>
          <InputLabel id="select-market-label">Choose a market</InputLabel>
          <Select labelId="select-market-label" id="select-market" value={this.state.selectedMarket} onChange={this.handleMarketChange}>
            {this.state.markets.map((market, index) => (
              <MenuItem key={index} value={market.id}>{market.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        </Grid>
      </Grid>
    )
  }
}

export default MarketPicker
