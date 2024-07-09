import { React, useEffect, useState } from 'react'
import { Flex, Box, Button, Center, Input, Card, CardBody, Text } from '@chakra-ui/react'
import CurrencyDropdown from './Components/CurrencyDropdown';
import axios from 'axios'
import './App.css';
const options = {
  headers: {
    'x-rapidapi-key': '76e08be752mshfc7225122772a39p10325bjsn3fc84b8394fb',
    'x-rapidapi-host': 'currency-convertor-api.p.rapidapi.com'
  }
};

function App() {
  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState()
  const [amount, setAmount] = useState(1)
  const [items, setItems] = useState([])
  const [isLoading, setLoading] = useState(false);
  const [convertedValue, setConvertedValue] = useState()
  useEffect(() => {
    axios.get('https://currency-convertor-api.p.rapidapi.com/currency', options)
      .then((res) => {
        console.log(res)
        const unique = res.data.filter((obj, index) => {
          return index === res.data.findIndex(o => obj.currencyCode === o.currencyCode);
        });
        unique.sort((a, b) => {
          const nameA = a.currencyName.toUpperCase(); // ignore upper and lowercase
          const nameB = b.currencyName.toUpperCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });
        console.log(unique)
        setItems(unique)
      }).catch((err) => {
        console.log(err)
      })
  }, [])
  function convert() {

    setLoading(true)
    setTimeout(() => {
      const options = {
        method: 'GET',
        url: `https://currency-convertor-api.p.rapidapi.com/convert/${amount}/${fromCurrency}/${toCurrency}`,
        headers: {
          'x-rapidapi-key': '76e08be752mshfc7225122772a39p10325bjsn3fc84b8394fb',
          'x-rapidapi-host': 'currency-convertor-api.p.rapidapi.com'
        }
      };
      axios.request(options).then((response) => {
        setLoading(false)
        console.log(response);
        setConvertedValue(response.data[0].rate)
      }).catch((err) => {
        console.log(err)
      });
    }, 2000);

  }
  return (
    <Box>
      <header><h1 className="headerText">Welcome to Currency Convertor</h1></header>
      <Flex m="1%">
        <CurrencyDropdown items={items} fun={setFromCurrency} />
        <CurrencyDropdown items={items} fun={setToCurrency} />
      </Flex>
      <Center><Text>Please Enter the Amount to be Converted</Text></Center>
      <Center><Input m="1%" width="10%" textAlign={'center'} placeholder={1} onChange={(e) => setAmount(e.target.value)}></Input></Center>
      <Center><Button
        isLoading={isLoading}
        isDisabled={fromCurrency == undefined || toCurrency == undefined}
        color='blue'
        onClick={convert}
      >Convert</Button></Center>
      <Center m="5%"><Card className='convertedValue'>
        <CardBody>
          <Text align={'center'}>{convertedValue}<br></br>{convertedValue?toCurrency:''}</Text>
        </CardBody>
      </Card></Center>
    </Box>
  );
}

export default App;
