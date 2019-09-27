import json
import urllib.request

def stockPricesTime(x, time):
  response = urllib.request.urlopen('https://api.iextrading.com/1.0/stock/' + x + '/chart/' + time)
  content_string = response.read().decode()
  content = json.loads(content_string)
  masterTable = []
  for array in content:
    masterTable.append([array['date'], array['close'], array['high'], array['low'], array['open'], array['volume']])
  return json.dumps(masterTable)

def stockDaily(x):
  response = urllib.request.urlopen('https://api.iextrading.com/1.0/stock/' + x + '/chart/1d')
  content_string = response.read().decode()
  content = json.loads(content_string)
  masterTable = []
  for array in content:
    if array['volume'] != 0:
      masterTable.append([array['minute'], array['close'], array['high'], array['low'], array['open'], array['marketVolume']])
  return json.dumps(masterTable)
