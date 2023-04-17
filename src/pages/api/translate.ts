import { NextApiRequest, NextApiResponse } from 'next';
import { Translate } from '@google-cloud/translate/build/src/v2';

export default async function hander(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const query = req.query;
    const text: string = query.text! as string;
    const languageCode: string = query.languageCode! as string;
    const translate = new Translate({
        credentials: {
            private_key: process.env.NEXT_PUBLIC_GOOGLE_PRIVATE_KEY!.replace(
                /\\n/g,
                '\n'
            ),
            client_email: process.env.NEXT_PUBLIC_CLIENT_EMAIL,
            client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
        },
        projectId: 'ocelist',
    });

    const translation = await translate.translate(text, { to: languageCode });
    return res.status(400).json({ translatedText: translation[0] });
}
