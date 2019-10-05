import json
import urllib.request

token = "?token=pk_2985dd57ddd54f6cbb806975920fe067"

def stockPricesTime(x, time):
  response = urllib.request.urlopen('https://cloud.iexapis.com/v1/stock/' + x + '/chart/' + time + token)
  content_string = response.read().decode()
  content = json.loads(content_string)
  masterTable = []
  for array in content:
    masterTable.append([array['date'], array['close'], array['high'], array['low'], array['open'], array['volume']])
  return json.dumps(masterTable)

def stockDaily(x):
  response = urllib.request.urlopen('https://cloud.iexapis.com/v1/stock/' + x + '/chart/1d' + token)
  content_string = response.read().decode()
  content = json.loads(content_string)
  masterTable = []
  for array in content:
    if array['volume'] != 0:
      masterTable.append([array['minute'], array['close'], array['high'], array['low'], array['open'], array['volume']])
  return json.dumps(masterTable)
