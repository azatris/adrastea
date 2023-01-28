import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import Chip from '@mui/joy/Chip';
import Typography from '@mui/joy/Typography';
import { Fireworks } from '@fireworks-js/react'
import {useEffect, useRef} from "react";

export default function UserProfile() {
	const [isLoading, setIsLoading] = React.useState(true);
	const [data, setData] = React.useState([]);

	const fireworks = useRef(null);

	function loadNewActivity() {
		fetch('/user/last')
			.then(response => response.json())
			.then(json => {
				setIsLoading(false);
				setData(json.user);
			})
			.catch((error) => console.log(error));
	}

	useEffect(() => {
		fireworks.current.stop();
		loadNewActivity();
	}, [])

	React.useEffect(() => {
		if (data.length !== 0) {
			setIsLoading(false);
		}
		console.log(data);
	}, [data]);

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
			{!isLoading && <Card
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
						src="https://source.unsplash.com/random?profile&w=84"
						loading="lazy"
						alt=""
					/>
				</AspectRatio>
				<div>
					<Typography level="h2" fontSize="lg" id="card-description" mb={0.5}>
						{ data.name }
					</Typography>
					<Chip
						variant="outlined"
						color="primary"
						size="sm"
						sx={{ pointerEvents: 'none' }}
					>
						Price: { data.price }
					</Chip>
					<Chip
						variant="outlined"
						color="primary"
						size="sm"
						sx={{ pointerEvents: 'none' }}
					>
						Accessibility: { data.accessibility }
					</Chip>
				</div>
			</Card>}
		</>
	);
}
