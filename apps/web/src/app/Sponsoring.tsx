"use client";

import { Grid, Heading, Text } from "@radix-ui/themes";
import Image from "next/image";
import { imageLoader } from "@/utils/utils";

const Sponsoring = () => {
	return (
		<>
			<section>
				<Heading size="8" mb="2" as="h2">
					Sponsoren
				</Heading>
				<Text as="p">Wir danken allen unseren Sponsoren.</Text>
			</section>

			<section className="mt-5">
				<Grid columns="4" align="center">
					<a
						href="https://www.cit.de/"
						target="_blank"
						rel="noreferrer noopener"
					>
						<Image
							loader={imageLoader}
							src="logo_cit.png"
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
							src="logo_allianz.png"
							alt="Allianz Logo"
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
