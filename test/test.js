const assert = require('assert')
const { validateURL, validateID } = require('ytdl-core')

const spotiyRegExp = new RegExp(/^(spotify:|https:\/\/[a-z]+\.spotify\.com\/)/)

describe('Music', () => {
    describe('Url', () => {
        it('should return true since the link is a valid spotify link', () => {
            const regExResult = spotiyRegExp.test('https://open.spotify.com/track/7EwNGyM05261K8rxXvtSg4?si=ox39iGdVRJWXGKiybaNCeQ')
            assert.strictEqual(regExResult, true)
        })

        it('should return false since this is not a valid spotify link', () => {
            const regExResult = spotiyRegExp.test('https://youtu.be/yjrdJBP5i1I')
            assert.strictEqual(regExResult, false)
        })

        it('should return true when given a valid youtube url', () => {
            const isYt = validateURL('https://youtu.be/yjrdJBP5i1I')
            assert.strictEqual(isYt, true)
        })

        it('should return true if a valid youtube id is given', () => {
            const isYt = validateID('yjrdJBP5i1I')
            assert.strictEqual(isYt, true)
        })
    })
})