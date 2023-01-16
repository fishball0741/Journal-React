// input: npm test, see App.jsx and package.json to see how works.  

// make sure import the render when we using it.
import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from "react-router-dom"
import App from "./App"

// then do a callback,   () => {} 
describe('App Component',  () => {
        // use beforeEach means we don't need to type whole const container in each test.
    let container
        
    beforeEach(function () {
        container = render(
            <BrowserRouter>
                <App />
            </BrowserRouter>
        ).container
    })

        
        
        // when we run the react app in the browser, the component get rendered, the app will go to physical browser.
        // the essentially has a virtual page we can query and represent by this build called 'screen' 
        // https://testing-library.com/docs/queries/about/        we can do it by role, text, id etc...  
        // level 2 = h2 heading in Home.jsx
        // it will be failed if the text content is not same as the Home.jsx, so if you type 'foo' it will fail,
        // write a sentence which describe an expectation, write down what we expect...
    // then do a callback,   () => {} 
    it('Show the All Categories heading', () => {
        expect(container.querySelector('h2')).toBeDefined()
        expect(container.querySelector('h2')).toHaveTextContent('Journal Entries')
        // expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Journal Entries')
    })

    it('Show category selection Page when Select Category is clicked', async () => {
        // const { container } = render(
        //     <BrowserRouter>
        //         <App />
        //     </BrowserRouter>
        // )
        // we need to simulate the user action
        // in userEvent. < many action to do, hover, click etc.
        await userEvent.click(screen.getByText('Select Category'))
        expect(container.querySelector('h2')).toBeDefined()
        expect(container.querySelector('h2')).toHaveTextContent('Please select a category:')
    })
})