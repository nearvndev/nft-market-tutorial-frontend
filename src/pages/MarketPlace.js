import React, { useEffect, useState } from 'react'
import {Button, Card, PageHeader} from "antd";
import {ShoppingCartOutlined} from "@ant-design/icons";
import { utils } from "near-api-js";
import {login} from "../utils";

const { Meta } = Card;

function MarketPlace() {
    const [data, setData] = useState([]);

    async function handleBuy(item) {
        try {
           if ( window.walletConnection.isSignedIn() ) {
               await window.contractMarket.offer(
                   {
                       nft_contract_id: item.nft_contract_id,
                       token_id: item.token_id
                   },
                   300000000000000,
                   item.sale_conditions
               )
           } else {
               login()
           }
        } catch (e) {
            console.log("Error: ", e);
        }
    }

    useEffect(async () => {
        try {
            let data  = await window.contractMarket.get_sales(
                {
                    nft_contract_id: "nft-tutorial.piknguyenvu.testnet",
                    from_index: "0",
                    limit: 10
                }
            );

            let mapItemData = data.map(async item => {
                let itemData =  await window.contractNFT.nft_token({token_id: item.token_id});
                return {
                    ...item,
                    itemData
                }
            });

            let dataNew = await Promise.all(mapItemData);
            setData(dataNew);
        } catch (e) {
            console.log(e);
        }
    }, []);

    return (
        <div>
            <PageHeader
                className="site-page-header"
                title="Marketplace"
            />
            <div>
                {
                    data.map( item => {
                        return (
                            <Card
                                key={item.token_id}
                                hoverable
                                style={{ width: 240 }}
                                cover={<img style={{maxHeight: 300, width: "100%", objectFit: "contain"}} alt="nft-cover" src={item.itemData.metadata.media} />}
                                actions={[
                                    <Button onClick={() => handleBuy(item)} icon={<ShoppingCartOutlined />}> Buy </Button>
                                ]}
                            >
                                <h1>{utils.format.formatNearAmount(item.sale_conditions)} NEAR</h1>
                                <Meta title={item.token_id} description={item.owner_id} />
                            </Card>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default MarketPlace;