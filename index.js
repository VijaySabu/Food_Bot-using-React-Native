import { StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react'
import {GiftedChat} from 'react-native-gifted-chat'
import axios from 'axios'
const ChatBot = () => {
    const[messages, setMessages] = useState([]) 
    const YOUR_CHATGPT_API_KEY = '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'
    const handleSend = async (newMessages = []) => {
        try{
            // Get user message
            const  userMessage = newMessages[0];
            setMessages(previousMessages => GiftedChat.append(previousMessages,userMessage));
            const messageText = userMessage.text.toLowerCase();
            const keywords = ['recipe', 'food' , 'diet', 'fruit']; //add more keywords as needed
            if(!keywords.some(keywords => messageText.includes(keywords))){
                const botMessage = {
                    _id : new Date().getTime() +1,
                    text : "I am your FoodBot , ask me anything related to food and recipe",
                    createdAt : new Date(),
                    user :{
                        _id : 2,
                        name : 'FoodBot'
                    }
                };
                setMessages(previousMessages => GiftedChat.append(previousMessages,botMessage));
                return;
            }
            const respone  = await axios.post('https://api.openai.com/v1/engines/text-davinci-003/completions')
            console.log(respone.data);
            const recipe = respone.data.choices[0].text.trim();
            const botMessage = {
              _id : new Date().getTime() +1,
              text : recipe,
              createdAt : new Date(),
              user :{
                  _id : 2,
                  name : 'FoodBot'
              }
            };
            setMessages(previousMessages => GiftedChat.append(previousMessages,botMessage))    
        } catch(error){
          console.log(error);
        }

    }
  return (
    <View style = {{ flex : 1 }}>
      <View
      style = {{
        
      }}
      >
        <Text
        style= {{
          fontSize : 32,
          fontWeight : 'bold' 
        }}
        >
          Food Bot
        </Text>
        <GiftedChat
        messages={messages}
        onSend = { newMessages =>handleSend(newMessages)}
        user = {{_id : 1}}
        />
      </View>
    </View>
  )
}

export default ChatBot

const styles = StyleSheet.create({})
