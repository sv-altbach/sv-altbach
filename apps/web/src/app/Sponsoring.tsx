"use client";

import { Grid, Heading, Text } from "@radix-ui/themes";
import Image from "next/image";
import { imageLoader } from "@/utils/utils";

const Sponsoring = () => {
	return (
		<>
			<section>
				<Heading size="8" mb="2" as="h2">
					Sponsoren & Partner
				</Heading>
				<Text as="p">Wir danken allen unseren Sponsoren und Partnern.</Text>
			</section>

			<section className="mt-5">
				<Grid columns={{ initial: "1", sm: "3" }} align="center" gap="8">
					<a
						href="https://www.cit.de/"
						target="_blank"
						rel="noreferrer noopener"
					>
						<Image
							loader={imageLoader}
							src="masters/logo_cit.png"
							alt="cit GmbH Logo"
							width={500}
							height={500}
						/>
					</a>

					<a
						href="https://vertretung.allianz.de/keck.angela/"
						target="_blank"
						rel="noreferrer noopener"
					>
						<Image
							loader={imageLoader}
							src="masters/logo_allianz.png"
							alt="Allianz Logo"
							width={500}
							height={500}
						/>
					</a>

					<a
						href="https://taplo.de/"
						target="_blank"
						rel="noreferrer noopener"
						className="ml-5"
					>
						<Image
							loader={imageLoader}
							src="masters/logo_taplo.png"
							alt="Tanschule Plochingen Logo"
							width={500}
							height={500}
						/>
					</a>
				</Grid>
			</section>
		</>
	);
};

export default Sponsoring;
