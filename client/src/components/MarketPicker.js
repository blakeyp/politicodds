import React from 'react'
import { Grid, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

import config from '../config'
import LoadingSpinner from './LoadingSpinner'

class MarketPicker extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      error: false,
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
      .catch(this.props.onError)

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
          loading: false,
          categories: data
        })
      })
      .catch(this.props.onError)
  }

  fetchCategories() {
    return fetch(`${config.apiUrl}/events`)
      .then(res => res.json())
  }

  fetchMarkets(categoryId) {
    return fetch(`${config.apiUrl}/events/${categoryId}/markets`)
      .then(res => res.json())
  }

  render() {
    return (
      <React.Fragment>
      {
        this.state.loading ? <LoadingSpinner /> :
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
      }
      </React.Fragment>
    )
  }
}

export default MarketPicker
