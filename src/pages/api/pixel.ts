import { NextApiRequest, NextApiResponse } from 'next'
import cache from "memory-cache";

const servePixel = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'GET') return res.status(404).send('Not Found');
    
    res.setHeader('Content-Type', 'text/javascript');

    //check if script is cached
    const cachedScript = cache.get('fbScript');
    if (cachedScript) return res.status(200).send(cachedScript);

    //get fb script
    const fbScript = await fetch('https://connect.facebook.net/en_US/fbevents.js');
    const fbScriptText = await fbScript.text();

    //cache fb script
    cache.put('fbScript', fbScriptText, 1000 * 60 * 60 * 24);

    //return fb script
    return res.status(200).send(fbScriptText);
}

export default servePixel;