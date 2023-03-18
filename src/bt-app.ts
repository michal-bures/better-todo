import {css, html, LitElement, render} from 'lit'
import {customElement, property} from 'lit/decorators.js'
import './bt-topic';
import {Topic} from './types';
import {BtTopic} from './bt-topic';

@customElement('bt-app')
export class BtApp extends LitElement {
    @property({type: Array})
    todos: Array<Topic> = [
        {
            title: 'Přesunutí sídla',
            actionItems: ['rozeslat notifikace'],
            urgency: 'critical'
        },
        {
            title: 'dořešit přehled pro ZP',
            actionItems: ['doplatek 146 Kč'],
            urgency: 'high'
        },
        {
            title: 'penzijko',
            actionItems: ['https://solarwinds.sharepoint.com/sites/SolariansCZ/SitePages/Pension%20Insurance.aspx'],
            urgency: 'high'
        }
    ]

    @property({type: Number})
    editedItem: number = -1

    selectTopic(index: number) {
        this.editedItem = index
    }

    render() {
        console.log('RE-RENDER')
        return html`
            <ul class="container">
                ${this.todos.map((todo, index) => html`
                    <bt-topic
                            .topic=${todo}
                            .onSubmit=${() => this.selectTopic(-1)}
                            ?editing=${this.editedItem === index}
                            @click=${() => this.selectTopic(index)}></bt-topic>
                `)}
            </ul>
        `
    }

    static styles = css`
        :host {
            max-width: calc(min(1280px, 100vw));
            min-width: 300px;
            margin: 0 auto;
            padding: 2rem;
            text-align: left;
        }

        .container {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }

        ul {
            padding: 0
        }
    `
}

declare global {
    interface HTMLElementTagNameMap {
        'my-app': BtApp
        'bt-topic': BtTopic
    }
}
