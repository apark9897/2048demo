FROM redis:7.0.5-alpine
WORKDIR /usr/local/etc/redis
COPY . .
RUN chmod -R 777 .
ENTRYPOINT ["./my-entrypoint.sh"]
CMD ["redis-server"]