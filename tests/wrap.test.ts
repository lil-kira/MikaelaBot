import { wrap } from '../src/util/styleUtil'

describe('wrap', function () {
    it('wrapSingle', function () {
        let result = wrap('meow');
        expect(result).toBe('\`meow\`')
    })

    it('wrapArray', function () {
        let result = wrap(['meow', 'woof', 'turtle', 'human', 'korone'])
        expect(result).toBe('\`meow\` \`woof\` \`turtle\` \`human\` \`korone\`')
    })
})