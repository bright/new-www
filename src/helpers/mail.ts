export enum FormType {
  contact = 'contact',
  startAProject = 'start-a-project',
  job = 'job',
}

export interface JobFormData {
  name: string
  email: string
  message?: string
  attachments: File[]
}

export async function sendMail(
  data: JobFormData | {
    [key: string]: {
      value: string | Blob
      fileName?: string
    }
  },
  formType: FormType
) {


  if (formType === 'contact' || formType === 'start-a-project') {
    const formData = new FormData()
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const element = data[key]

        formData.append(key, element.value, element.fileName)
      }
    }

    return fetch(
      'https://prod-38.northeurope.logic.azure.com/workflows/1d03b23263424a8a8bef4287c5c50add/triggers/manual/paths/invoke/contact?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=uAHDF64Wovfav_yXqKz2l2m_MZ-f9kAzDx6i49kDGq0',
      {
        method: 'POST',
        body: formData
      }
    )
  }

  if (formType === 'job') {
    const input = data as JobFormData
    const formData = new FormData()
    formData.append('name', input.name)
    formData.append('email', input.email)
    formData.append('message', input.message ?? 'Unknown message. Please check javascript code.')

    input.attachments.forEach((file, index) => {
      formData.append(`attachment${index}`, file, file.name)
    })

    formData.append('source', window.location.href)

    return fetch(
      'https://prod-50.northeurope.logic.azure.com/workflows/ebe3138deb79483499fece1fdb88d591/triggers/manual/paths/invoke/job?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=ZFCcJhp_9FTFToWYjRfl4uoeqGDQOS-_4z0TpVjAgUk',
      {
        method: 'POST',
        body: formData
      }
    )
  }
}
