FROM public.ecr.aws/lambda/nodejs:20
COPY index.js package.json ./
RUN npm install
CMD [ "index.handler" ]