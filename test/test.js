const assert = require('assert')

const spotiyRegExp = new RegExp(/^(spotify:|https:\/\/[a-z]+\.spotify\.com\/)/)

describe('Spotify', () => {
    describe('Url', () => {
        it('should return true since the link is a valid spotify link', () => {
            assert.equal(spotiyRegExp.test('https://open.spotify.com/track/7EwNGyM05261K8rxXvtSg4?si=ox39iGdVRJWXGKiybaNCeQ'), true)
        })

        it('should return false since this is not a valid spotify link', () => {
            const regexResult = spotiyRegExp.test('https://youtu.be/yjrdJBP5i1I')
            assert.equal(regexResult, false)
        })
    })
})