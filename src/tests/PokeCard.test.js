import {render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/react'
import axios from 'axios'
import Pokecard from '../components/Pokecard'
import { pokeCardMock } from './pokeCardMock'

jest.mock("axios")

//Props mockadas
const urlMock = 'https://pokeapi.co/api/v2/pokemon/2/'

const openModalMock = jest.fn()

//Resposta do axios.get Mockado
// const axiosResponseMock ={
//     data: pokeCardMock
// }


describe("PokeCard.js", ()=>{

    // test("Card Renderiza", async()=>{
    //     // axios.get.mockResolvedValueOnce(axiosResponseMock)
    //     axios.get.mockResolvedValueOnce({
    //         data: pokeCardMock
    //     })

    //     render(<Pokecard
    //         url={urlMock} 
    //         openModal={openModalMock}/>)
    //     screen.debug()

    //     await waitFor(()=>{})
    //     screen.debug()     
    // })

    test("Card renderiza após carregamento", async()=>{
        axios.get.mockResolvedValueOnce({
            data: pokeCardMock
        })

        render(<Pokecard
            url={urlMock} 
            openModal={openModalMock}/>)
        
        const loading = screen.getByText(/loading\.\.\./i)
            
        expect(loading).toBeInTheDocument()

        await waitFor(()=>{
            const namePoke = screen.getByRole('heading', { name: /rattata/i })
            const ImgPoke = screen.getByRole('img', { name: /rattata/i })
            const typePoke = screen.getByText(/normal/i)

            expect(namePoke).toBeInTheDocument()
            expect(ImgPoke).toBeInTheDocument()
            expect(typePoke).toBeInTheDocument()
            expect(loading).not.toBeInTheDocument()
        })

        // screen.logTestingPlaygroundURL()

    })
})