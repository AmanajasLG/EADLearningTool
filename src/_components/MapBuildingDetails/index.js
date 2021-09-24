import React from 'react'
import { numberList } from '../../_helpers'
import { Iniciar, Voltar } from '../Button'

const MapBuildingDetails =
({location,
  style, ...props}) => {
  return(
    <div
      style={{
        color: "white",
        textAlign: "center",
        width: "50%",
        fontSize: "1.3em",
        ...style
      }}
    >
      <div
        style={{
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
          backgroundColor: "#535c89",
          height: showEmail ? "1.5em" : "2.2em",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <InlineSVG
          style={{
            width: "1.5em",
            height: "1.5em",
            marginRight: ".3em",
            filter:
              "invert(100%) sepia(42%) saturate(2%) hue-rotate(123deg) brightness(112%) contrast(101%)",
          }}
          src={location.image}
          alt=""
        />
        <span>{location.name}</span>
        <span
          style={{
            position: "absolute",
            right: ".3em",
            top: showEmail ? "-.08em" : "-.1em",
            fontSize: showEmail ? "1em" : "1.5em",
          }}
          onClick={onClose? onClose : null}
        >
          x
        </span>
      </div>
      {}
    </div>
  )
}

export default MapBuildingDetails
