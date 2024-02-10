import { Liquid } from 'liquidjs';
import { DateTime } from 'luxon';

import html from '../docs/_layouts/simple.html';

const engine = new Liquid();

export async function render(pageData: any, content: string): Promise<string> {

    const generated = DateTime.now().toUTC().toISO();
    return engine.parseAndRender(html, { 
        generated, 
        content,
        site: {
            title: 'Lucky Logo',
        },
        page: pageData 
    });
}

