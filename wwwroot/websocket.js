window.connectWebSocket = (dotNetHelper) => {
    const socket = new WebSocket('ws://localhost:8043');

    socket.onmessage = function(event) {
        const item = JSON.parse(event.data);
        console.log('incoming', item.market_hash_name)
        var shouldSkip = false//true;
        if (!item.buy_buff163_CNY) {
            item.buy_buff163_CNY = 0
        } else {
            item.buy_buff163_CNY = item.buy_buff163_CNY*1
        }
        if (item.LastSales_freq_dmarket_Offer_raw < 24*60*60*1000) {
            if (item.sell_dmarketTradable_AUD-item.skinportSalePriceAud > 0) {
                shouldSkip = false;
            }
            if (item.sell_buff163_AUD-item.skinportSalePriceAud > 0) {
                shouldSkip = false;
            }
            if (item.sell_skinportTradable_AUD-item.skinportSalePriceAud > 0) {
                shouldSkip = false;
            }
        }
        if (shouldSkip) {
            console.log('skipping', item.market_hash_name)
            return
        }
        dotNetHelper.invokeMethodAsync('AddItem', item);
    };

    socket.onopen = function(event) {
        console.log('WebSocket is open now.');
        let msg = { msg: 'isSkinportLiveList' }
        socket.send(JSON.stringify(msg));

        setTimeout(()=>{
            console.log("testItem")
            console.log(testItem)
            dotNetHelper.invokeMethodAsync('AddItem', JSON.parse(JSON.stringify(testItem)));
        }, 5000)
    };

    socket.onclose = function(event) {
        console.log('WebSocket is closed now.');
    };


    socket.onerror = function(error) {
        console.error('WebSocket Error:', error);
    };
};


var testItem = {"market_hash_name":"Test Case","marketplace":"all","timestamp_steam":1710356242994,"buy_steam_AUD_median_price":0.42,"buy_steam_AUD_lowest_price":0.42,"volume_steam":"116,898","timestamp_dmarket":1720434020947,"buy_dmarket_USD":0.29,"buy_dmarketTradable_USD":0.29,"sell_dmarket_USD":0.261,"sell_dmarketTradable_USD":0.261,"buy_dmarket_AUD":0.471,"buy_dmarketTradable_AUD":0.471,"sell_dmarket_AUD":0.424,"sell_dmarketTradable_AUD":0.424,"quantity_dmarket":10000,"quantity_dmarketTradable":10000,"lastSales_dmarket_Offer":[[1720431595000,"Offer","0.3",null,"08/07/2024, 7:39:55 pm"],[1720431595000,"Offer","0.3",null,"08/07/2024, 7:39:55 pm"],[1720431595000,"Offer","0.3",null,"08/07/2024, 7:39:55 pm"],[1720431595000,"Offer","0.3",null,"08/07/2024, 7:39:55 pm"],[1720405877000,"Offer","0.29",null,"08/07/2024, 12:31:17 pm"],[1720405877000,"Offer","0.29",null,"08/07/2024, 12:31:17 pm"],[1720405877000,"Offer","0.29",null,"08/07/2024, 12:31:17 pm"],[1720405877000,"Offer","0.29",null,"08/07/2024, 12:31:17 pm"],[1720405877000,"Offer","0.29",null,"08/07/2024, 12:31:17 pm"],[1720405877000,"Offer","0.29",null,"08/07/2024, 12:31:17 pm"],[1720405877000,"Offer","0.29",null,"08/07/2024, 12:31:17 pm"],[1720405877000,"Offer","0.29",null,"08/07/2024, 12:31:17 pm"],[1720405877000,"Offer","0.29",null,"08/07/2024, 12:31:17 pm"],[1720405877000,"Offer","0.29",null,"08/07/2024, 12:31:17 pm"],[1720405877000,"Offer","0.29",null,"08/07/2024, 12:31:17 pm"],[1720405877000,"Offer","0.29",null,"08/07/2024, 12:31:17 pm"],[1720405877000,"Offer","0.29",null,"08/07/2024, 12:31:17 pm"],[1720405877000,"Offer","0.29",null,"08/07/2024, 12:31:17 pm"],[1720405877000,"Offer","0.29",null,"08/07/2024, 12:31:17 pm"],[1720405877000,"Offer","0.29",null,"08/07/2024, 12:31:17 pm"]],"LastSales_freq_dmarket_Offer_raw":1353578.9473684211,"LastSales_freq_dmarket_Offer":"22m","timestamp_skinport":1720447497048,"quantity_skinport":20665,"quantity_skinportTradable":19739,"buy_skinport_EUR":0.18,"buy_skinportTradable_EUR":0.19,"skinport_rates_EUR":0.6228783,"buy_skinport_AUD":0.289,"buy_skinportTradable_AUD":0.305,"sell_skinport_AUD":0.254,"sell_skinportTradable_AUD":0.268,"buff_goods_id":"781534","timestamp_buff":1720434017678,"buy_buff163_CNY":0,"sell_buff163_CNY":0,"buy_buff163_AUD":0,"sell_buff163_AUD":0,"quantity_buff":0,"RATE_CNY":0.20017391304,"buffId":"781534","message":{"msg":"getItemData","data":{"msgSource":"skinportWebsocket","msgTimestamp":1720447593932,"items":["Fracture Case"],"forceUpdate":["dmarket","skinport","buff"],"forceRefresh":true,"skinportSaleData":{"id":0,"saleId":46245234,"shortId":"IKPTCYFHCLD","productId":30498881,"assetId":337336451,"itemId":56847,"appid":730,"steamid":"76561199667168808","url":"fracture-case","family":"Fracture Case","family_localized":"Fracture Case","name":"Fracture Case","title":"Container","text":"Base Grade Container","marketName":"Fracture Case","marketHashName":"Fracture Case","color":"#D2D2D2","bgColor":null,"image":"-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXU5A1PIYQNqhpOSV-fRPasw8rsUFJ5KBFZv668FFU2nfGaJG0btN2wwYHfxa-hY-uFxj4Dv50nj7uXpI7w3AewrhBpMWH6d9CLMlhpEbAe-Zk","classid":"3946324730","assetid":"38641377638","lock":"2024-07-16T07:00:00.000Z","version":"default","versionType":"default","stackAble":true,"suggestedPrice":31,"salePrice":18,"currency":"AUD","saleStatus":"listed","saleType":"public","category":"Container","category_localized":"Container","subCategory":null,"subCategory_localized":null,"pattern":null,"finish":null,"customName":null,"wear":null,"link":null,"type":"Base Grade Container","exterior":null,"quality":"Normal","rarity":"Base Grade","rarity_localized":"Base Grade","rarityColor":"#b0c3d9","collection":"The Fracture Collection","collection_localized":"The Fracture Collection","stickers":[],"canHaveScreenshots":false,"screenshots":[],"souvenir":false,"stattrak":false,"tags":[{"name":"Normal","name_localized":"Normal"},{"name":"Base Grade","name_localized":"Base Grade"},{"name":"Container","name_localized":"Container"},{"name":"The Fracture Collection","name_localized":"The Fracture Collection"}],"ownItem":false},"saleURL":"https://skinport.com/item/fracture-case/46245234"}},"reqTimestamp":1720447593932,"skinportSalePriceAud":0.2}