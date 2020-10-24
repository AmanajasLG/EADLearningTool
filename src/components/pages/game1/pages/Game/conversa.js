import React from 'react'
import {Redirect} from 'react-router-dom'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';

const Conversa = ({charData, clearCurrentChar, checkEnd, endGame}) => {
    const [state, setState] = React.useState(false) 
    
    const handleSubmit = (form) => {
        setState(true)
    }
    
    return (
        <div id="conversa" style={{position: "absolute", top: "10vh", left: "10vw", width: "80vw", height: "80vh", backgroundColor: "#FFFFFF", color: "#000000"}}>
            {
                endGame ? 
                <div>
                    <form onSubmit={handleSubmit}>
                        <FormControl component="fieldset" >
                            <FormLabel component="legend">Pop quiz: Material-UI is...</FormLabel>
                            <RadioGroup aria-label="quiz" name="quiz">
                                <FormControlLabel value="me" control={<Radio />} label="Eu me chamo Fulana!" />
                                <FormControlLabel value="te" control={<Radio />} label="Eu te chamo Fulana!" />
                                <FormControlLabel value="se" control={<Radio />} label="Eu se chamo Fulana!" />
                            </RadioGroup>
                            <Button type="submit" variant="outlined" color="primary" >
                            Check Answer
                            </Button>
                        </FormControl>
                    </form>
                    {
                        state ? <Redirect to="/result" /> : null
                    }
                </div>
                :
                <div>
                    <div>Meu nome é {charData.nome}</div>
                    <div>Minha profissão é {charData.trabalho}</div>
                    <div>Meu estado civil é {charData.estadoCivil}</div>

                    <button onClick={clearCurrentChar}>Continuar procurando</button>
                    <button onClick={checkEnd}>É fulano</button>
                </div>
            }
            
        </div>
    )
}

export default Conversa