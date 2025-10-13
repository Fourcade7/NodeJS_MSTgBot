
import bot from "./server.js";


let lastOrderId=""
async function getData() {
  try {
    const response = await fetch(`https://api.moysklad.ru/api/remap/1.2/entity/demand?order=moment,desc`,{
      method:"GET",
      headers:{
       "Authorization": "Bearer  ef9a39b28b7d84d49f6d4ff0a3f50b2432c041f2"
       //"Authorization": "Bearer  0e4a364118a70d4ba0a2dd233a47b09fb28225e7"
      }
    });      // GET request
    const data = await response.json();     // JSON ga aylantirish
    
   
    if(data?.rows?.length>0){
      console.log(data.rows[0].id)
      getPositions(data.rows[0].id)
    }else{
      console.log("data null")
    }
    
  } catch (err) {
    console.error("Xato:", err.message);
    
  }
}

async function getPositions(id) {
  try {
    const response = await fetch(`https://api.moysklad.ru/api/remap/1.2/entity/demand/${id}?expand=owner,agent,positions.assortment&fields=stock`,{
      method:"GET",
      headers:{
       "Authorization": "Bearer  ef9a39b28b7d84d49f6d4ff0a3f50b2432c041f2"
       
      }
    });      // GET request
    const data = await response.json();     // JSON ga aylantirish
    
    if(data){
        if(data?.positions?.rows?.length>0){
            let itemsString = "";
            data.positions.rows.forEach((item,index) => {
                console.log(item.assortment.name)
                itemsString+=(index+1)+". "+item.assortment.name+` - ${item.quantity}m x ${item.price/100} UZS\n`;
                });

            console.log(data.name)
            bot.sendMessage(6080018622,`📦 Новая Отгрузка №:${data.name} \n🧔🏻‍♂️ Сотрудник: ${data.owner.name}	 \n🕓 ${data.created} \n\n🙆🏻‍♂️ Контрагент: ${data.agent.name}\n🗳 Товары:\n${itemsString}\n\n💵 Общая цена покупки  ${data.sum/100} UZS `)
        }
        
    }
    
    let itemsString = "";
    /*if(data?.positions?.rows?.length>0){
      data.positions.rows.forEach((item,index) => {
      console.log(item.assortment.name)
      itemsString+=item.assortment.name+"\n";
      });

    if(data?.positions?.rows?.length>0){
      let summa=Number(data.sum)/100;
      newLead(summa,itemsString)
    }

    }else{
      console.log("data null")
    }*/
    
  } catch (err) {
    console.error("Xato:", err.message);
    
  }
}



export {getPositions,getData}