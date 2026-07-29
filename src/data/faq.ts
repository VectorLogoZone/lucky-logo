export const faqs = [
    {
        answerHtml:
            "<p>Make a url like this: <code>https://luckylogo.dev/?url=example.com</code>. You can use that URL as the <code>src</code> of an <code>&lt;img&gt;</code> tag on your website, and it will display the logo for the specified website (<code>example.com</code> in this case).</p>",
        question: "How do I use this?",
        slug: "how-to-use",
    },
    {
        answerHtml:
            "<p>I made it for my own use, and do not mind sharing for light, non-commercial use. I am not going to provide support and you should not count on it being here forever. If you want to use it for something serious or commercial, you should host it yourself: it is not hard to set up and run.</p>",
        question: "Can I use this for free?",
        slug: "free",
    },
    {
        answerHtml:
            '<p>I needed a simple way to get a logo for a project I am working on (<a href="https://www.rss.style">RSS.Style</a>). I did not like any of the <a href="/alternatives">existing options</a> that I found, and it was a fun weekend project.</p>',
        question: "Why did you make this?",
        slug: "why",
    },
    {
        answerHtml:
            '<p>I am sorry you feel that way. If you do not like it, please try one of the <a href="/alternatives.html">alternatives</a>.</p>',
        question: "This sucks!",
        slug: "sucks",
    },
    {
        answerHtml:
            '<p>I am glad you like it. I plan to add more features in the future, but I do not have a specific timeline. It is <a href="https://github.com/VectorLogoZone/lucky-logo">open source</a> and <a href="https://github.com/VectorLogoZone/lucky-logo/CONTRIBUTING.md">contributions are welcome</a>.</p>',
        question: "This is great, but I need...",
        slug: "greatbut",
    },
    {
        answerHtml:
            '<p>In theory, it should work on any website. In practice: try the <a href="/compare.html">comparison tool</a> and see how it does on your actual data.</p>',
        question: "What websites does it have logos for?",
        slug: "coverage",
    },
    {
        answerHtml: `<p>It uses a few different methods to find logos.</p>
                <ul>
                    <li><code>favicon.ico</code></li>
                    <li>Various metadata in the HTML <code>&lt;head&gt;</code></li>
                    <li><a href="https://bimi-explorer.svg.zone/bimi/">BIMI</a> DNS records</li>
                    <li><a href="https://www.vectorlogo.zone/">VectorLogoZone</a></li>
                    <li><a href="https://developers.google.com/knowledge-graph">Google Knowledge Graph</a></li>
                </ul>
                <p>You can see all the logos it finds for a given URL on the <a href="/analyze.html">Analyze</a> page.</p>`,
        question: "How does it find the logos?",
        slug: "algorithms",
    },
    {
        answerHtml:
            '<p>This is URL encoding: how characters that are not allowed in URLs are handled. Since the demo page will handle any URL, it is conservative and encodes almost everything. If you have a URL with normal characters, you can usually use it as-is. If it contains special characters, you will need to <a href="https://www.fileformat.info/convert/text/url-encoder-decoder.htm">URL encode</a> them.</p>',
        question:
            "What is with all the % characters in the image URL on the demo page?",
        slug: "percents",
    },
    {
        answerHtml:
            "<p>No. Lucky Logo will accept the URL with or without the <code>https://</code> prefix and normalize it for you.</p>",
        question: "Do I need to include the https:// in the URL?",
        slug: "need-prefix",
    },
    {
        answerHtml:
            "<p>If you specify an <code>http://</code> website, Lucky Logo can still fetch a logo. But you cannot embed that result on a secure <code>https://</code> site unless the resulting image URL is also secure.</p>",
        question: "Will it work with insecure (http://) URLs?",
        slug: "http",
    },
];
