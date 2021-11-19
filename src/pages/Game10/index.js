import React from 'react'
import { Redirect } from 'react-router-dom'
import Init from '../../_components/Init'
import GameTemplate from '../GameTemplate'
import Feedback from './feedback'
import Core from './core'

import initialState from './initialState'
import stub from './stub'

const Game10 = (props) => {
  const load = (missionData, lang, state, setState) => {

    if(missionData){
      const introText = `Olá! Eu sou ${missionData.character.name}! Para planejar a festa, você vai precisar:`
      const introTextTranslation = `Hello! I am ${missionData.character.name}! In order to plan the party, you will need:`
      const dishText = `Acho que seria legal servir... Uma feijoada!`
      let clothes =
      {
        Pés: [],
        Pernas: [],
        Tronco: [],
        Acessórios: []
      }
      Object.keys(clothes).forEach(type =>
        missionData.clothes.map(c => {
          if(c.tags.find( t => t.name === type))
            clothes[type].push(c)
        })
      )
      let dressingCharacters = missionData.dressingCharacters.map(c => ({...c, image: c.characterAssets[0].image.url}))
      const wardrobeBody = ["Tronco", "Pernas", "Pés"];
      let wardrobe = missionData.clothes.reduce((acc, clothing) => {
        let clothingReduce = {
          id: clothing.id,
          name: clothing.asset.name,
          cover: clothing.cover ?? "default",
          image: clothing.asset.image ? clothing.asset.image.url : "",
          wardrobeImage: clothing.wardrobeAsset
            ? clothing.wardrobeAsset.url
            : "",
          category: clothing.tags.find((tag) => tag.type === "category").name,
          color: clothing.tags.find((tag) => tag.type === "color").name,
          time: clothing.tags
            .filter((tag) => tag.type === "time")
            .map((tag) => tag.name),
          weather: clothing.tags
            .filter((tag) => tag.type === "weather")
            .map((tag) => tag.name),
          picked: false,
        };

        if (wardrobeBody.includes(clothingReduce.category))
          acc[clothingReduce.category] = [
            ...(acc[clothingReduce.category] || []),
            clothingReduce,
          ];
        else acc["Acessórios"] = [...(acc["Acessórios"] || []), clothingReduce];

        return acc;
      }, {});

      setState(s => ({...s, data:
        {...stub, ...missionData, //stub itens overriden by missionData itens
          //  aditional data
          introText, introTextTranslation, dishText,
          clothes, dressingCharacters, wardrobe
        }})
      )
    }
  }

  const loadFeedback = (data) => data

  return(
    <GameTemplate
      Core={Core}
      Feedback={Feedback}
      missionId={props.match.params.id}
      loadData={load}
      loadFeedback={loadFeedback}
    />
  )
}

export default Game10
