import {customElement, property, query} from 'lit/decorators.js';
import {css, html, LitElement, render} from 'lit';
import {Topic} from './types';

@customElement('bt-topic')
export class BtTopic extends LitElement {

    @property({attribute: false, type: Object})
    topic: Topic

    _editing: boolean | undefined = undefined

    @property({attribute: true, type: Boolean})
    editing: boolean = false

    @property({attribute: false, type: Function})
    onSubmit: () => void

    @query('#actionItemInput')
    actionItemInput: HTMLInputElement

    liElement : HTMLLIElement

    constructor() {
        super();
        this.liElement = document.createElement('li')
    }

    get currentItem() {
        return this.topic.actionItems[this.topic.actionItems.length-1]
    }

    render() {
        if (this._editing !== this.editing) {
            // edit mode changed
            this._editing = this.editing
            this.liElement.className=`urgency-${this.topic.urgency} ${this.editing?'editing':''}`
            this.liElement.style.cursor = this.editing ? 'default' : 'pointer'
            render(this.renderContent(), this.liElement)

            if (this._editing) {
                this.actionItemInput.focus()
                this.actionItemInput.select()

            }
        }
        return this.liElement

        console.log('RE-RENDER TOPIC')
        //return html`<li class="urgency-${this.topic.urgency}" @click=${this.handleClick}>${this.renderContent()}</li>`
    }

    renderContent(){
        if (this.editing) {
            return html`<h2>${this.topic.title}${this.editing ? '[EDIT]' : ''}</h2>
            > <input id="actionItemInput" type="text" value=${this.currentItem} @keydown=${this.handleKeyPress.bind(this)}></input>`
        } else {
            return html`<h2>${this.topic.title}</h2>
            <p>> ${this.currentItem}</p>
        </li>`
        }
    }

    handleKeyPress(event: KeyboardEvent) {
        console.log(event)
        if (event.code === 'Enter') {
            console.log('SUBMIT')
            this.onSubmit()
        }
    }

    static styles = css`
        li {
            display: flex;
            flex-direction: column;
            align-items: stretch;
            box-sizing: border-box;
            border-radius: 1rem;
            padding: 1rem;
            box-shadow: 0px 10px 15px -3px rgba(0,0,0,0.2);
            border: 2px solid rgb(0,0,0,0);
            cursor: pointer;
            transition: height 2000ms;
            width: calc(min(75vw,700px));
            
        }
        
        //li:hover {
        //    transform: scale(1.01);
        //}
        
        p, input {
            word-break: break-all;
            font-size: 1em;
            background-color: transparent;
            border: none;
            width: 100%
        }
        input {
            outline: none;
            border-bottom: 1px solid gray;

        }
        
        h2 {
            font-size: 1.2rem;
            margin:0
        }
        
        .editing {
            border: 2px dashed rgb(255,255,255,0.75);
        }
        
        .urgency-critical {
            background-color: #aa0000;
        }
        
        .urgency-high {
            background-color: #ff6600
        }
        
        .urgency-moderate {
            background-color: #ffd42a
        }
        
        .urgency-low {
            background-color: #ececec
        }
        
    
    `
}
