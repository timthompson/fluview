class Utils {
    cleanInput (input) {
        // remove all non alpha and numeric (ans whitespace) characters
        return input.replace(/[^0-9a-z\s]/gi, '');
    }
    
    capitalizeAndOr (input) {
        return input.replace(/(\bor|\band)/gi, l => l.toUpperCase())
    }
    
    stripSpacing (input) {
        return input.replace(/(\s*OR\s*|\s*AND\s*)/g, l => l.trim())
    }
    
    processInput (input) {
        let cleaned = this.capitalizeAndOr(input);
        cleaned = this.cleanInput(cleaned);
        cleaned = this.stripSpacing(cleaned);
        return cleaned.trim()
    }
}

module.exports = Utils;