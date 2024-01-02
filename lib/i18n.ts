
const addMessage = (message, response, body) => {
  return {
    ...response,
    body: JSON.stringify({
      ...body,
      message
    })
  }
}

const parseTemplates = (message: string, params) => {
  if (!params) {
    return message
  }

  const keys = Object.keys(params)

  let text = message

  for (const key of keys) {
    const search = `{${key}}`
    text = text.replace(new RegExp(search, 'g'), params[key])
  }
  return text
}

const resolve = ({ language, response }) => {
  try {
    const parsedBody = JSON.parse(response?.body)
    const { message } = parsedBody

    if (Array.isArray(message)) {
      if (language === 'en') {
        const templates = message.map(parse => parseTemplates(parse?.en, parse.params))

        const finalMessage = templates.join(', ')

        return addMessage(
          finalMessage,
          response,
          parsedBody
        )
      }

      const templates = message.map(parse => parseTemplates(parse?.ptBr, parse.params))

      const finalMessage = templates.join(', ')

      return addMessage(
        finalMessage,
        response,
        parsedBody
      )
    }

    if (language === 'en' && message?.en) {
      return addMessage(
        parseTemplates(message?.en, message.params),
        response,
        parsedBody
      )
    }

    if (message?.ptBr) {
      return addMessage(
        parseTemplates(message?.ptBr, message.params),
        response,
        parsedBody
      )
    }

    return response
  } catch (error) {
    return response
  }
}

const get = (definition, params?) => {
  return {
    ...definition,
    params
  }
}

const translator = (definition, language: string = 'ptBr', params?) => {
  const languageSelected = definition[language] ? language : 'ptBr'
  return parseTemplates(definition[languageSelected], (params || {}))
}

const i18n = {
  resolve,
  get,
  translator,
  parseTemplates
}

export {
  i18n
}
