import bottle
import stockdata

#routes to charting parameter functions
@bottle.route('/stockvis.js')
def getStockVis():
    return bottle.static_file('stockvis.js', root='.')


#routes to button redirect functions
@bottle.route('/script.js')
def getScript():
    return bottle.static_file('script.js', root='.')


#homepage
@bottle.route('/')
def index():
    return bottle.static_file('index.html', root='.')


#routes to daily stock data's master table
@bottle.route('/stockdatadaily/<name1>')
def dailyData(name1):
    return stockdata.stockDaily(name1)


#routes to normal stock data with time's master table
@bottle.route('/stockdata/<name1>/<name2>')
def getStock(name1, name2):
    return stockdata.stockPricesTime(name1, name2)


#query link for stock graph results
@bottle.route('/stock')
def stockTime():
    ticker = bottle.request.query.ticker
    time = bottle.request.query.time
    return bottle.template('stock.html', name1=ticker, name2=time)


#query link for daily stock graph results
@bottle.route('/daily')
def stockDay():
    ticker = bottle.request.query.ticker
    return bottle.template('stockdaily.html', name1=ticker)


bottle.run(host='0.0.0.0', port=8080, debug=True)
