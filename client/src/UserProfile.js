import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Link from '@mui/joy/Link';
import Card from '@mui/joy/Card';
import Chip from '@mui/joy/Chip';
import Typography from '@mui/joy/Typography';
import { Fireworks } from '@fireworks-js/react'
import {useEffect, useRef} from "react";

export default function UserProfile() {
	const fireworks = useRef(null);

	useEffect(() => {
		fireworks.current.stop();
	}, [])

	const onProfileClick = () => {
		fireworks.current.launch(25);
	}

	return (
		<>
			<Fireworks
				ref={fireworks}
				options={{
					rocketsPoint: {
						min: 0,
						max: 100
					}
				}}
				style={{
					top: 0,
					left: 0,
					width: '100%',
					height: '100%',
					position: 'fixed',
					zIndex: -1,
				}}
			/>
			<Card
				variant="outlined"
				row
				sx={{
					width: 320,
					gap: 2,
					'&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
				}}
				onClick={() => onProfileClick()}
			>
				<AspectRatio ratio="1" sx={{ width: 90 }}>
					<img
						src="https://source.unsplash.com/random?profile"
						loading="lazy"
						alt=""
					/>
				</AspectRatio>
				<div>
					<Typography level="h2" fontSize="lg" id="card-description" mb={0.5}>
						Napoléon Bonaparte
					</Typography>
					<Chip
						variant="outlined"
						color="primary"
						size="sm"
						sx={{ pointerEvents: 'none' }}
					>
						Price: Low
					</Chip>
					<Chip
						variant="outlined"
						color="primary"
						size="sm"
						sx={{ pointerEvents: 'none' }}
					>
						Accessibility: High
					</Chip>
				</div>
			</Card>
		</>
	);
}
