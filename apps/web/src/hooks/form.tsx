import {
	createFormHook,
	createFormHookContexts,
} from "@tanstack/react-form-nextjs";
import {
	Field,
	FieldContent,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const { fieldContext, formContext, useFieldContext, useFormContext } =
	createFormHookContexts();

function Root({ ...props }: React.ComponentProps<typeof Field>) {
	const field = useFieldContext<unknown>();

	return <Field {...props} data-invalid={!field.state.meta.isValid} />;
}

function Group({ ...props }: React.ComponentProps<typeof FieldGroup>) {
	return <FieldGroup {...props} />;
}

function Label(props: React.ComponentProps<typeof FieldLabel>) {
	return <FieldLabel {...props} />;
}

function Content(props: React.ComponentProps<typeof FieldContent>) {
	return <FieldContent {...props} />;
}

function Description(props: React.ComponentProps<typeof FieldDescription>) {
	return <FieldDescription {...props} />;
}

function ErrorMessage({
	className,
	errors,
	...props
}: React.ComponentProps<typeof FieldError>) {
	const field = useFieldContext<unknown>();
	const isValid = field.state.meta.isValid;
	const fieldErrors = field.state.meta.errors ?? [];

	return (
		!isValid && (
			<FieldError {...props} className={className} errors={fieldErrors} />
		)
	);
}

function FieldInput({ ...props }: React.ComponentProps<typeof Input>) {
	const field = useFieldContext<string>();

	return (
		<Input
			{...props}
			name={field.name}
			value={field.state.value ?? ""}
			aria-invalid={!field.state.meta.isValid}
			onBlur={field.handleBlur}
			onChange={(event) => field.handleChange(event.target.value)}
		/>
	);
}

function FieldTextarea(props: React.ComponentProps<typeof Textarea>) {
	const field = useFieldContext<string>();

	return (
		<Textarea
			name={field.name}
			value={field.state.value ?? ""}
			aria-invalid={!field.state.meta.isValid}
			onBlur={field.handleBlur}
			onChange={(event) => field.handleChange(event.target.value)}
			{...props}
		/>
	);
}

export const { useAppForm, useTypedAppFormContext, withFieldGroup, withForm } =
	createFormHook({
		fieldContext,
		fieldComponents: {
			Root,
			Group,
			Label,
			Content,
			Description,
			Error: ErrorMessage,
			Input: FieldInput,
			Textarea: FieldTextarea,
		},
		formContext,
		formComponents: {},
	});
