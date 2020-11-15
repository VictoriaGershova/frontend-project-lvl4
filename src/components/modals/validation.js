import * as yup from 'yup';

const channelSchema = yup.object().shape({
  name: yup.string()
    .min(3, 'Must be 3 to 20 characters')
    .max(20, 'Must be 3 to 20 characters')
    .required('Required field'),
});

export default channelSchema;
