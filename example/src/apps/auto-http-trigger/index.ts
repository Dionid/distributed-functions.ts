import { App } from '@distributed-functions/core'
import { RabbitMQTransport } from '@distributed-functions/transport-rabbitmq'
import { HttpTrigger } from '@distributed-functions/trigger-http'

import { WithdrawMoneyCall } from '../../libs/calls'

export const main = async () => {
  const transport = RabbitMQTransport.new({
    config: {
      host: 'localhost',
      port: 5674,
      username: 'ff-user',
      password: 'ff-password',
      heartbeat: 10,
      vhost: 'ff'
    }
  })

  const httpTrigger = HttpTrigger.new({
    calls: [WithdrawMoneyCall]
  })

  const app = App({
    name: 'iam',
    dfs: [],
    triggers: [httpTrigger],
    transport,
    ctx: () => {
      return {}
    }
  })

  await app.start()
}

main()
