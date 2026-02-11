/^# / { sub("#", "##"); print; print "" }       # Print chapter headings as H2
/^> Grammar of / { in_grammar = 1 }             # Start printing at the start of a box
in_grammar && /^>/ { print }                    # Keep printing the rest of the note box
in_grammar && /^$/ { in_grammar = 0; print "" } # Stop printing at the first blank line
