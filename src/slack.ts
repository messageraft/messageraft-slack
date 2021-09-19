import {
  DirectMessageProvider,
  ProviderName,
  ProviderType,
  SlackConstructorOptions,
  SlackDirectMessageOptions,
} from '@messageraft/common'

import { WebClient } from '@slack/web-api'

class SlackProvider extends DirectMessageProvider {
  name = ProviderName.SLACK
  type = ProviderType.DIRECT_MESSAGE
  slack: WebClient
  channel: string | undefined

  constructor(options: SlackConstructorOptions) {
    super()
    if (!options || !options.token) throw new Error('Slack token not provided')

    this.slack = new WebClient(options.token)

    if (options.channel) this.channel = options.channel
  }

  async send(data: SlackDirectMessageOptions): Promise<any> {
    if (!data.channel && !this.channel) {
      throw new Error(
        'Field `channelId` was not provided. Either include in every request or initialize it through an env variable called SLACK_CHANNEL_ID'
      )
    }
    if (!data.channel && this.channel) {
      data.channel = this.channel
    }
    return this.slack.chat.postMessage(data as Required<SlackDirectMessageOptions>)
  }
}

export { SlackProvider as provider }
