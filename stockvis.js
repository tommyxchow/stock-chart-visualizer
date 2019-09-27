function loadChart(x, time) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      var chartParams = getChartParams(this.response);
      Plotly.plot('chart', chartParams.data, chartParams.layout);
    }
  };
  xhttp.open("GET", "/stockdata/" + x + "/" + time);
  xhttp.send();
}


//candlestick chart

function candleStickData(x) {
  var tableDates = [];
  var tableClose = [];
  var tableHigh = [];
  var tableLow = [];
  var tableOpen = [];
  for (var array of x) {
    tableDates.push(array[0])
    tableClose.push(array[1])
    tableHigh.push(array[2])
    tableLow.push(array[3])
    tableOpen.push(array[4])
  }
  var data = {
    x: tableDates,
    close: tableClose,
    high: tableHigh,
    low: tableLow,
    open: tableOpen,
    type: 'candlestick',
    xaxis: 'x',
    yaxis: 'y'
  };
  return [data];
}

function stockDateRange(x) {
  var table = [];
  table.push(x[0][0]);
  table.push(x[(x.length) - 1][0]);
  return table;
}

function sortCompare(x,y) {
  if (x > y) {
    return 1;
  }
  if (x < y) {
    return -1;
  }
  return 0;
}

function stockPriceRange(x) {
  var minTable = [];
  var maxTable = [];
  var result = [];
  for (var array of x) {
    minTable.push(array[3])
    maxTable.push(array[2])
  }
  minTable.sort(sortCompare);
  maxTable.sort(sortCompare);
  result.push(minTable[0])
  result.push(maxTable[(maxTable.length) - 1])
  return result
}

function candleStickLayout(x) {
  var layout = {
    title: 'Stock',
    dragmode: 'zoom',
    margin: {
      r: 10,
      t: 25,
      b: 40,
      l: 60
    },
    showlegend: false,
    xaxis: {
      autorange: true,
      domain: [0, 1],
      range: [stockDateRange(x)[0], stockDateRange(x)[1]],
      rangeslider: { range: [stockDateRange(x)[0], stockDateRange(x)[1]] },
      title: 'Date',
      type: 'date',
    },
    yaxis: {
      autorange: true,
      domain: [0, 1],
      range: [stockPriceRange(x)[0], stockPriceRange(x)[1]],
      type: 'linear',
      title: 'Price (USD)'
    }
  }
  return layout
}

function getChartParams(x) {
  input = JSON.parse(x)
  return { data: candleStickData(input), layout: candleStickLayout(input) }
}


//volume chart

function loadVolume(x, time) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      var chartParams = getVolumeParams(this.response);
      Plotly.plot('bar', chartParams.data, chartParams.layout);
    }
  };
  xhttp.open("GET", "/stockdata/" + x + "/" + time);
  xhttp.send();
}

function volumeData(x) {
  tableDates = []
  tableVolume = []
  for (var array of x) {
    tableDates.push(array[0])
    tableVolume.push(array[5])
  }
  var data = {
    x: tableDates,
    y: tableVolume,
    type: 'bar',
    name: 'Volume',
  }
  return [data]
}

function volumeLayout() {
  var layout = {
    title: 'Volume'
  }
  return layout
}

function getVolumeParams(x) {
  input = JSON.parse(x)
  return {data: volumeData(input), layout: volumeLayout()}
}

function load(x, time) {
  loadChart(x, time)
  loadVolume(x, time)
}


//daily candlestick graph

function dayData(x) {
  var tableTimes = [];
  var tableClose = [];
  var tableHigh = [];
  var tableLow = [];
  var tableOpen = [];
  for (var array of x) {
    tableTimes.push(array[0])
    tableClose.push(array[1])
    tableHigh.push(array[2])
    tableLow.push(array[3])
    tableOpen.push(array[4])
  }
  var data = {
    x: tableTimes,
    close: tableClose,
    high: tableHigh,
    low: tableLow,
    open: tableOpen,
    type: 'candlestick',
    xaxis: 'x',
    yaxis: 'y'
  };
  return [data]
}


function dayDateRange(x) {
  var table = []
  table.push(x[0][0])
  table.push(x[(x.length) - 1][0])
  return table
}

function dayPriceRange(x) {
  var minTable = []
  var maxTable = []
  var result = []
  for (var array of x) {
    minTable.push(array[3])
    maxTable.push(array[2])
  }
  minTable.sort(sortCompare)
  maxTable.sort(sortCompare)
  result.push(minTable[0])
  result.push(maxTable[(maxTable.length) - 1])
  return result
}

function dayLayout(x) {
  var layout = {
    title: 'Stock',
    dragmode: 'zoom',
    margin: {
      r: 10,
      t: 25,
      b: 40,
      l: 60
    },
    showlegend: false,
    xaxis: {
      autorange: true,
      domain: [0, 1],
      range: [dayDateRange(x)[0], dayDateRange(x)[1]],
      rangeslider: { range: [dayDateRange(x)[0], dayDateRange(x)[1]] },
      title: 'Time',
      type: 'time',
    },
    yaxis: {
      autorange: true,
      domain: [0, 1],
      range: [dayPriceRange(x)[0], dayPriceRange(x)[1]],
      type: 'linear',
      title: 'Price (USD)'
    }
  }
  return layout
}

function getDailyParams(x) {
  input = JSON.parse(x)
  return {data: dayData(input), layout: dayLayout(input)}
}

function loadDay(x) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      var dailyChartParams = getDailyParams(this.response);
      Plotly.plot('chart', dailyChartParams.data, dailyChartParams.layout);
    }
  };
  xhttp.open("GET", "/stockdatadaily/" + x);
  xhttp.send();
}


//daily bar graph

function dailyVolumeData(x) {
  tableTimes = []
  tableVolume = []
  for (var array of x) {
    tableTimes.push(array[0])
    tableVolume.push(array[5])
  }
  var data = {
    x: tableTimes,
    y: tableVolume,
    type: 'bar',
    name: 'Volume',
  }
  return [data]
}

function dailyVolumeLayout() {
  var layout = {
    title: 'Volume',
    xaxis: {
      title:'Time'
    },
    yaxis: {
      title: 'Volume'
    }
  }
  return layout
}

function getDailyVolumeParams(x) {
  input = JSON.parse(x)
  return {data: dailyVolumeData(input), layout: dailyVolumeLayout()}
}

function dailyLoadVolume(x) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      var chartParams = getDailyVolumeParams(this.response);
      Plotly.plot('bar', chartParams.data, chartParams.layout);
    }
  };
  xhttp.open("GET", "/stockdatadaily/" + x);
  xhttp.send();
}

function dailyLoad(x) {
  loadDay(x);
  dailyLoadVolume(x);
}