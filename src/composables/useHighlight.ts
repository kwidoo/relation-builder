import hljs from 'highlight.js';
import 'highlight.js/styles/night-owl.css';

export default function useHighlight(): {
    highlight: (code: string) => string
} {
    hljs.configure({ languages: ['php'] });

    const highlight = (code: string) => {
        return hljs.highlight(code, { language: 'php' }).value;
    }

    return {
        highlight
    }
}