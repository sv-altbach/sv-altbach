if (!process.env.PAYLOAD_SECRET) {
	process.env.PAYLOAD_SECRET = "test-secret-test-secret-test-secret";
}

process.env.POSTGRES_URL =
	process.env.CMS_TEST_POSTGRES_URL ?? "postgresql://postgres@127.0.0.1:54320/cms_test";

delete process.env.BLOB_READ_WRITE_TOKEN;
