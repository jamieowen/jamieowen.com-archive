global.fetch = require('node-fetch');
const path = require('path');
const fs = require('fs');
const cc = require('cryptocompare');
cc.setApiKey('4ee532e625c8dbed9ae53e63a2cf013416d78c779489e4635ff6764cd5852cbd');

// https://www.npmjs.com/package/cryptocompare

const encoding = { encoding: 'utf8' };
const coinListPath = path.join( __dirname, 'coin-list.json' );
const exchangeListPath = path.join( __dirname, 'exchange-list.json' );
const pairPath = ( from, to )=>path.join( __dirname, 'historical', `${from}_${to}.json` );

/**
 * Cache response helper.
 * Could have better use of Promises on the fs classes.
 * @param {*} path 
 * @param {*} orExecute 
 */
const fromCache = (filePath,orExecute)=>{
  console.log( path.basename(filePath) );
  if( fs.existsSync(filePath) ){
    return Promise.resolve().then(()=>{
      console.log( '(from cache)');
      const data = fs.readFileSync( filePath,encoding );
      const json = JSON.parse( data );
      return json;
    })
  }else{
    return orExecute().then( data=>{
      console.log( '(from api)');
      const json = JSON.stringify( data, null, 2 );
      fs.writeFileSync( filePath,json,encoding );
      return data;
    });
  }
}

/**
 * Extract trading pairs trading to a specific coin.
 * e.g. 'BTC'
 * [
 *  [ 'POE', 'BTC' ],
 *  [ 'ETC', 'BTC' ],
 *  ...
 * ]
 * @param {*} symb The symbol trading to.
 * @param {*} exch 
 */
const getTradingPairs = (symb,exch)=>{
  const pairs = [];
  Object.keys( exch ).forEach( key=>{
    const from = key;    
    const to = exch[key];
    if( to.indexOf(symb) >= 0 ){
      pairs.push( [ from,symb ] );
    }
  })
  return pairs;
}

/**
 * Fetch Data.
 */
Promise.resolve()
  .then( ()=>{
    return fromCache( coinListPath, ()=>{
      return cc.coinList();
    });
  })
  .then( coinList=>{
    return fromCache( exchangeListPath, ()=>{
      return cc.exchangeList();
    })
  })
  .then( exchangeList=>{

    const binance = exchangeList.Binance;
    const pairs = getTradingPairs( 'BTC', binance );

    let q = Promise.resolve();
    pairs.forEach( ([from,to],i)=>{
      q = q.then( ()=>{
        let outPath = pairPath( from, to );
        return fromCache( outPath, ()=>{
          return cc.histoDay( from,to, {
            limit: 'none',
            tryConversion: false
          })
        })
      })
    });
    return q;

  })
  .then( ()=>{
    console.log('done');
  })